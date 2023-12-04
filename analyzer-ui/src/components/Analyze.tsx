import { useState, ChangeEvent } from "react";
import axios from "axios";
import {
  Box,
  Textarea,
  Text,
  Button,
  Heading,
  HStack,
  Container,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useColorMode,
} from "@chakra-ui/react";

export default function Analyze() {
  const [code, setCode] = useState("");
  const [analysisResults, setAnalysisResults] = useState<JSX.Element[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const { toggleColorMode } = useColorMode();

  const formatAnalysisResult = (rawResult: string): JSX.Element[] => {
    return rawResult
      .split("\n")
      .filter((line) => !line.startsWith("'solc "))
      .map((line, index) => {
        let color = "gray.900";
        if (line.startsWith("INFO:Detectors:")) {
          color = "blue.500";
        } else if (line.startsWith("Reference:")) {
          color = "green.500";
        } else if (line.startsWith("Warning:")) {
          color = "orange.500";
        }

        return (
          <Text key={index} color={color}>
            {line}
          </Text>
        );
      });
  };

  const handleAnalyzeClick = async () => {
    setLoading(true);
    setError("");
    setAnalysisResults([]);

    try {
      const response = await axios.post("http://localhost:5000/analyze", code, {
        headers: {
          "Content-Type": "text/plain",
        },
      });
      if (response.status === 200) {
        setAnalysisResults(formatAnalysisResult(response.data.result));
      } else {
        setError(response.data.error || "An error occurred");
      }
    } catch (err) {
      setError("An error occurred while trying to analyze the code.");
      toast({
        title: "An error occurred.",
        description: "An error occurred while trying to analyze the code.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  return (
    <Container maxW="container.xl" py={5}>
      <Heading as="h1" mb={6}>
        Solidity Analyzer
      </Heading>
      <HStack spacing={5} align="start">
        <Box flex="1" borderWidth="1px" borderRadius="lg" p={4}>
          <Textarea
            value={code}
            onChange={handleInputChange}
            placeholder="Solidity source code must be flattened before paste here..."
            height="300px"
          />
          <Button
            colorScheme="blue"
            onClick={handleAnalyzeClick}
            isLoading={loading}
            loadingText="Analyzing"
            disabled={!code.trim()}
            mt={4}
          >
            Analyze
          </Button>
        </Box>
        <Box
          flex="1"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          height="300px"
          overflowY="auto"
        >
          {analysisResults.length > 0 ? (
            <>{analysisResults}</>
          ) : (
            <Text color="gray.500">Analysis results will appear here.</Text>
          )}
        </Box>
      </HStack>
      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          <AlertTitle mr={2}>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setError("")}
          />
        </Alert>
      )}

      <Button
        onClick={toggleColorMode}
        variant="outline"
        colorScheme="blue"
        mt={4}
      >
        Toggle Dark Mode
      </Button>
    </Container>
  );
}
