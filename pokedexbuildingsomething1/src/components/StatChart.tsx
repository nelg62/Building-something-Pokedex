import { PokemonStat } from "@/types/pokemonTypes";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface StatChartProps {
  stats: PokemonStat[];
}

const StatChart = ({ stats }: StatChartProps) => {
  const shortenStatName = (name: string) => {
    const statMap: { [key: string]: string } = {
      "special-attack": "SP. ATK",
      "special-defense": "SP. DEF",
    };
    return statMap[name] || name.toUpperCase();
  };

  const data = stats.map((s) => ({
    name: shortenStatName(s.stat.name),
    value: s.base_stat,
  }));
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" domain={[0, 150]} hide />
        <YAxis
          dataKey="name"
          type="category"
          width={60}
          tick={{ fontSize: 12, textAnchor: "end" }}
        />

        <Tooltip />
        <Bar dataKey="value" fill="#3b82f6" radius={[5, 5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatChart;
