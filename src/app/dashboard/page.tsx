"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKpis, Kpi } from "@/lib/hooks/useKpis";
import KpiCard from "@/components/KpiCard";
import { InsightToast } from "@/components/InsightToast";
import {
  Box,
  Flex,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Spinner,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { AlertTriangle, Loader2 } from "lucide-react";
// Charting libraries - lazy load them
import dynamic from "next/dynamic";

// Import Chart.js components for registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// Lazy load react-chartjs-2 components
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
  loading: () => <Spinner color="pink.500" size="xl" thickness="4px" />,
});
// Placeholder for Heatmap - react-chartjs-2 doesn't have a native heatmap
// You might need a different library or plugin like chartjs-chart-matrix
const PlaceholderHeatmap = () => (
  <Flex
    align="center"
    justify="center"
    h={64}
    bg="gray.100"
    color="gray.500"
    borderRadius="lg"
  >
    Heatmap Chart (TBD)
  </Flex>
);

// Placeholder chart data/options
const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [65000, 59000, 80000, 81000, 56000, 55000],
      fill: false,
      borderColor: "#FF6FA7", // Pink
      tension: 0.1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const bannerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function DashboardPage() {
  const { data, isLoading, error } = useKpis();
  const [showInsight, setShowInsight] = useState(false);
  const [insightMessage, setInsightMessage] = useState<string | null>(null);

  // Check thresholds when data loads
  useEffect(() => {
    if (data) {
      const noShowKpi: Kpi | undefined = data.kpis.find(
        (kpi: Kpi) => kpi.id === "noShowRate",
      );
      const noShowThreshold = data.thresholds?.noShowRate;
      if (noShowKpi && noShowThreshold) {
        const rate = parseFloat(noShowKpi.value.replace("%", ""));
        if (rate > noShowThreshold) {
          setInsightMessage(
            `🪥 No-show rate (${noShowKpi.value}) is above threshold (${noShowThreshold}%). Time to polish your recall process!`,
          );
          setShowInsight(true);
          return; // Show first insight found
        }
      }
      // Add more threshold checks here...
      // If no thresholds met, ensure toast is hidden
      setShowInsight(false);
    }
  }, [data]);

  const handleDismissInsight = () => {
    setShowInsight(false);
    setInsightMessage(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <VStack spacing={{ base: 6, md: 8 }} align="stretch">
        {/* Welcome Banner */}
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box
            p={6}
            borderRadius="lg"
            bg="cyan.100"
            _dark={{ bg: "cyan.700" }}
            shadow="md"
          >
            <Heading size="lg" color="gray.800" _dark={{ color: "white" }}>
              Welcome back, Daria!
            </Heading>{" "}
            {/* TODO: Get name dynamically */}
            <Text color="gray.600" _dark={{ color: "gray.200" }}>
              Here's your practice overview for today.
            </Text>
          </Box>
        </motion.div>

        {/* KPI Grid */}
        {isLoading && (
          <Flex justify="center" align="center" h={32}>
            <Spinner color="pink.500" size="xl" thickness="4px" />
          </Flex>
        )}
        {error && (
          <Flex
            align="center"
            gap={2}
            p={4}
            borderRadius="lg"
            bg="red.100"
            color="red.700"
          >
            <Icon as={AlertTriangle} boxSize={5} />
            <Text>Error loading KPIs: {error.message}</Text>
          </Flex>
        )}
        {data && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
              {data.kpis.map((kpi: Kpi) => (
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

        {/* Charts Section */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card variant="outline">
              <CardHeader>
                <Heading size="md" color="gray.800" _dark={{ color: "white" }}>
                  Revenue Trend (YTD)
                </Heading>
              </CardHeader>
              <CardBody h={{ base: 64, md: 80 }}>
                <Line data={lineChartData} options={chartOptions} />
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card variant="outline">
              <CardHeader>
                <Heading size="md" color="gray.800" _dark={{ color: "white" }}>
                  No-show Hotspots
                </Heading>
              </CardHeader>
              <CardBody>
                <PlaceholderHeatmap />
              </CardBody>
            </Card>
          </motion.div>
        </SimpleGrid>

        {/* Insight Toast */}
        <InsightToast
          message={insightMessage}
          thresholdMet={showInsight}
          onDismiss={handleDismissInsight}
        />
      </VStack>
    </motion.div>
  );
}
