
import React from "react";
import AgentCard from "./saved-agents/AgentCard";
import EmptyAgentState from "./saved-agents/EmptyAgentState";
import AgentListHeader from "./saved-agents/AgentListHeader";
import LoadingState from "./saved-agents/LoadingState";
import { useSavedAgents } from "./saved-agents/useSavedAgents";

interface SavedAgentListProps {
  user: { id: string } | null;
  onLoadAgent: (agent: any) => void;
  onRefresh?: () => void;
  onBrowseTemplates?: () => void;
}

const SavedAgentList: React.FC<SavedAgentListProps> = ({ 
  user, 
  onLoadAgent, 
  onRefresh, 
  onBrowseTemplates 
}) => {
  const { agents, loading, fetchAgents, deleteAgent } = useSavedAgents(user);

  const handleRefresh = () => {
    fetchAgents();
    if (onRefresh) onRefresh();
  };

  const handleDeleteAgent = (id: string) => {
    deleteAgent(id);
    if (onRefresh) onRefresh();
  };

  return (
    <div className="space-y-6 bg-[#1A1F2C] p-6 rounded-lg">
      <AgentListHeader 
        onRefresh={handleRefresh} 
        isLoading={loading}
      />

      {loading ? (
        <LoadingState />
      ) : agents.length === 0 ? (
        <EmptyAgentState onBrowseTemplates={onBrowseTemplates || (() => {})} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onLoadAgent={onLoadAgent}
              onDeleteAgent={handleDeleteAgent}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedAgentList;
