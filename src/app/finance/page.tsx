"use client";

import React from "react";
import { motion } from "framer-motion";
import { useKpis, Kpi } from "@/lib/hooks/useKpis"; // Reuse KPI hook
import KpiCard from "@/components/KpiCard"; // Reuse KPI Card
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { AlertTriangle, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

// Import Chart.js components for registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement, // For Bar chart
  ArcElement, // For Doughnut chart
  Title, // Already registered in dashboard, but good practice if needed here
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components required by charts on this page
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

// Lazy load charts
const Doughnut = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  {
    ssr: false,
    loading: () => <Spinner color="gray.400" size="xl" thickness="4px" />,
  },
);
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
  loading: () => <Spinner color="gray.400" size="xl" thickness="4px" />,
});
// Sparkline might require a specific component or careful configuration of Line
const PlaceholderSparkline = () => (
  <Flex
    h={12}
    bg="gray.100"
    borderRadius="md"
    align="center"
    justify="center"
    fontSize="xs"
    color="gray.400"
  >
    Sparkline TBD
  </Flex>
);

// Mock Data (replace with actual data fetching later)
const doughnutData = {
  labels: ["Achieved", "Target Remaining"],
  datasets: [
    {
      label: "Revenue vs Target",
      data: [1234567, 365433], // Example: $1.23M achieved, $1.6M target
      backgroundColor: [
        "#FF6FA7", // Pink
        "#E5E7EB", // Gray
      ],
      borderColor: ["#FF6FA7", "#E5E7EB"],
      borderWidth: 1,
    },
  ],
};

const barData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Cash Inflow",
      data: [80000, 75000, 95000, 88000, 92000, 105000],
      backgroundColor: "#B8F1D0", // Mint
    },
    {
      label: "Cash Outflow",
      data: [-60000, -62000, -70000, -65000, -68000, -72000],
      backgroundColor: "#FFCDA5", // Peach
    },
  ],
};

const arData = [
  { bucket: "0-30 Days", amount: "$55,200", percent: "45%" },
  { bucket: "31-60 Days", amount: "$30,500", percent: "25%" },
  { bucket: "61-90 Days", amount: "$18,300", percent: "15%" },
  { bucket: "90+ Days", amount: "$18,300", percent: "15%" },
  { bucket: "Total", amount: "$122,300", percent: "100%" },
];

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function FinancePage() {
  // Reuse useKpis hook, potentially filter/select financial KPIs if needed
  const { data: kpiData, isLoading: kpiLoading, error: kpiError } = useKpis();

  // Filter for relevant financial KPIs (example)
  const financialKpis =
    kpiData?.kpis.filter((kpi: Kpi) =>
      ["revenueYtd", "dormantValue"].includes(kpi.id),
    ) || [];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <VStack spacing={{ base: 6, md: 8 }} align="stretch">
        {/* KPI Section */}
        <Box as="section">
          <Heading size="lg" mb={4} color="gray.800" _dark={{ color: "white" }}>
            Key Financial Metrics
          </Heading>
          {kpiLoading && (
            <Flex justify="center" align="center" h={24}>
              <Spinner color="pink.500" size="xl" thickness="4px" />
            </Flex>
          )}
          {kpiError && (
            <Flex
              align="center"
              gap={2}
              p={4}
              borderRadius="lg"
              bg="red.100"
              color="red.700"
            >
              <Icon as={AlertTriangle} boxSize={5} />
              <Text>Error loading KPIs: {kpiError.message}</Text>
            </Flex>
          )}
          {financialKpis.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {financialKpis.map((kpi: Kpi) => (
                  <KpiCard
                    key={kpi.id}
                    title={kpi.title}
                    value={kpi.value}
                    delta={kpi.delta}
                    icon={kpi.icon}
                  />
                ))}
              </SimpleGrid>
            </motion.div>
          )}
        </Box>

        {/* Charts & Table Section */}
        <Box as="section">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
              {/* Revenue vs Target & Sparkline */}
              <motion.div variants={cardVariants}>
                <Card variant="outline">
                  <CardHeader>
                    <Heading
                      size="md"
                      color="gray.800"
                      _dark={{ color: "white" }}
                    >
                      Revenue vs. Target
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4}>
                      <Box h={40} w="full">
                        <Doughnut
                          data={doughnutData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                          }}
                        />
                      </Box>
                      <Box w="full">
                        <Heading size="sm" color="gray.600" mb={1}>
                          Trend
                        </Heading>
                        <PlaceholderSparkline />
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>
              </motion.div>

              {/* A/R Aging - Wrap motion.div in Box for gridColumn */}
              <Box gridColumn={{ base: "span 1", lg: "span 2" }}>
                <motion.div variants={cardVariants}>
                  <Card variant="outline" h="full">
                    <CardHeader>
                      <Heading
                        size="md"
                        color="gray.800"
                        _dark={{ color: "white" }}
                      >
                        A/R Aging Summary
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <TableContainer>
                        <Table variant="simple">
                          <Thead>
                            <Tr>
                              <Th>Bucket</Th>
                              <Th isNumeric>Amount</Th>
                              <Th isNumeric>% of Total</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {arData.map((row) => (
                              <Tr
                                key={row.bucket}
                                fontWeight={
                                  row.bucket === "Total"
                                    ? "semibold"
                                    : undefined
                                }
                                bg={
                                  row.bucket === "Total" ? "gray.50" : undefined
                                }
                                _dark={{
                                  bg:
                                    row.bucket === "Total"
                                      ? "gray.700"
                                      : undefined,
                                }}
                              >
                                <Td>{row.bucket}</Td>
                                <Td isNumeric>{row.amount}</Td>
                                <Td isNumeric>{row.percent}</Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </CardBody>
                  </Card>
                </motion.div>
              </Box>

              {/* Cash Flow - Wrap motion.div in Box for gridColumn */}
              <Box gridColumn={{ base: "span 1", lg: "span 3" }}>
                <motion.div variants={cardVariants}>
                  <Card variant="outline">
                    <CardHeader>
                      <Heading
                        size="md"
                        color="gray.800"
                        _dark={{ color: "white" }}
                      >
                        Monthly Cash Flow
                      </Heading>
                    </CardHeader>
                    <CardBody h={64}>
                      <Bar
                        data={barData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: { legend: { position: "top" } },
                          scales: {
                            x: { stacked: true },
                            y: { stacked: true },
                          },
                        }}
                      />
                    </CardBody>
                  </Card>
                </motion.div>
              </Box>
            </SimpleGrid>
          </motion.div>
        </Box>
      </VStack>
    </motion.div>
  );
}
