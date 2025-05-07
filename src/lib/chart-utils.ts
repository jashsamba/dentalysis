import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

export function registerChartComponents() {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  );
}

export const defaultLineChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: { display: true, text: "Chart Data" },
  },
  scales: { y: { beginAtZero: true } },
};

export const defaultBarChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: { display: true, text: "Chart Data" },
  },
};

export const defaultPieChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "right" as const },
  },
};
