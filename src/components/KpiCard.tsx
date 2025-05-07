import React from "react";
import {
    Box,
    Card, 
    CardBody, 
    CardHeader, 
    Heading, 
    Text, 
    Flex, 
    Icon, 
    Stat, 
    StatNumber, 
    StatHelpText, 
    StatArrow,
    useColorModeValue
} from "@chakra-ui/react";
import {
  DollarSign,
  CalendarCheck,
  UserX,
  Archive,
  Icon as LucideIcon, // Keep LucideIcon type alias if used elsewhere
} from "lucide-react";
import { motion } from "framer-motion";

// Map icon names from JSON to actual Lucide components
const iconMap: { [key: string]: React.FC<any> } = {
  DollarSign,
  CalendarCheck,
  UserX,
  Archive,
  // Add more icons as needed
};

interface KpiCardProps {
  title: string;
  value: string;
  delta: string;
  icon: string; // Icon name as string
}

// Determine trend based on delta string
const getTrend = (delta: string): "increase" | "decrease" | "neutral" => {
  if (delta.startsWith("+")) return "increase";
  if (delta.startsWith("-")) return "decrease";
  return "neutral";
};

const KpiCard: React.FC<KpiCardProps> = ({ title, value, delta, icon }) => {
  const IconComponent = iconMap[icon] || DollarSign; // Default icon
  const trend = getTrend(delta);

  // Use Chakra Stat component for better semantics
  const cardBg = useColorModeValue("white", "gray.700");
  const titleColor = useColorModeValue("gray.500", "gray.400");
  const valueColor = useColorModeValue("gray.800", "white");
  const iconColor = useColorModeValue("gray.400", "gray.500");

  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={cardVariants}>
      <Card bg={cardBg} shadow="md" borderRadius="lg">
        <CardHeader pb={2}> 
          <Flex justify="space-between" align="center">
            <Heading size="sm" fontWeight="medium" color={titleColor}>
              {title}
            </Heading>
            <Icon as={IconComponent} boxSize={5} color={iconColor} />
          </Flex>
        </CardHeader>
        <CardBody pt={0}>
          <Stat>
            <StatNumber fontSize="2xl" fontWeight="bold" color={valueColor}>
              {value}
            </StatNumber>
            <StatHelpText display="flex" alignItems="center">
              {trend !== 'neutral' && <StatArrow type={trend} />}
              {delta}
              <Text as="span" ml={1} color={titleColor}> from last period</Text>
            </StatHelpText>
          </Stat>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default KpiCard;
