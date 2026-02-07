import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type PredictionInput } from "@shared/routes";

export function usePredictions() {
  return useQuery({
    queryKey: [api.predictions.list.path],
    queryFn: async () => {
      const res = await fetch(api.predictions.list.path);
      if (!res.ok) throw new Error("Failed to fetch predictions");
      return api.predictions.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreatePrediction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PredictionInput) => {
      const res = await fetch(api.predictions.create.path, {
        method: api.predictions.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.predictions.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create prediction");
      }
      return api.predictions.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.predictions.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.stats.list.path] });
    },
  });
}

export function useVoiceQuery() {
  return useMutation({
    mutationFn: async (query: string) => {
      const res = await fetch(api.voice.query.path, {
        method: api.voice.query.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error("Voice query failed");
      return api.voice.query.responses[200].parse(await res.json());
    },
  });
}

export function useStats() {
  return useQuery({
    queryKey: [api.stats.list.path],
    queryFn: async () => {
      const res = await fetch(api.stats.list.path);
      if (!res.ok) throw new Error("Failed to fetch stats");
      return api.stats.list.responses[200].parse(await res.json());
    },
  });
}
