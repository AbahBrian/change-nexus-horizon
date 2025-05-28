
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Zap, TrendingUp, AlertTriangle, Target } from 'lucide-react';

interface PrioritySimulatorProps {
  selectedPlant: string;
}

const PrioritySimulator: React.FC<PrioritySimulatorProps> = ({ selectedPlant }) => {
  const [impactWeight, setImpactWeight] = useState(40);
  const [urgencyWeight, setUrgencyWeight] = useState(35);
  const [resourceWeight, setResourceWeight] = useState(25);
  const [selectedScenario, setSelectedScenario] = useState('current');

  const partChanges = [
    {
      id: 'PCB-2024-A',
      partName: 'Circuit Board Module',
      impact: 8.5,
      urgency: 7.2,
      resourceAvailability: 6.8,
      businessValue: 85000,
      riskFactor: 'High',
      customerImpact: 'Major',
      department: 'Engineering'
    },
    {
      id: 'MAC-2024-08',
      partName: 'Machinery Component',
      impact: 9.2,
      urgency: 9.5,
      resourceAvailability: 4.2,
      businessValue: 150000,
      riskFactor: 'Critical',
      customerImpact: 'Critical',
      department: 'Manufacturing'
    },
    {
      id: 'MET-2024-15',
      partName: 'Metal Housing Component',
      impact: 6.3,
      urgency: 5.8,
      resourceAvailability: 8.5,
      businessValue: 45000,
      riskFactor: 'Medium',
      customerImpact: 'Minor',
      department: 'Materials'
    },
    {
      id: 'ELE-2024-12',
      partName: 'Electronic Control Unit',
      impact: 7.8,
      urgency: 8.1,
      resourceAvailability: 7.3,
      businessValue: 120000,
      riskFactor: 'High',
      customerImpact: 'Major',
      department: 'Engineering'
    },
    {
      id: 'PLT-2024-05',
      partName: 'Plastic Assembly',
      impact: 5.5,
      urgency: 4.9,
      resourceAvailability: 9.1,
      businessValue: 28000,
      riskFactor: 'Low',
      customerImpact: 'Minor',
      department: 'Materials'
    }
  ];

  const calculatePriorityScore = (part: any) => {
    const normalizedImpact = part.impact / 10;
    const normalizedUrgency = part.urgency / 10;
    const normalizedResource = part.resourceAvailability / 10;
    
    return (
      (normalizedImpact * impactWeight / 100) +
      (normalizedUrgency * urgencyWeight / 100) +
      (normalizedResource * resourceWeight / 100)
    ) * 100;
  };

  const sortedParts = [...partChanges]
    .map(part => ({
      ...part,
      priorityScore: calculatePriorityScore(part)
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore);

  const getPriorityLevel = (score: number) => {
    if (score >= 80) return { level: 'Critical', color: 'bg-red-100 text-red-800' };
    if (score >= 65) return { level: 'High', color: 'bg-orange-100 text-orange-800' };
    if (score >= 50) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
    return { level: 'Low', color: 'bg-green-100 text-green-800' };
  };

  const scenarios = {
    current: { impact: 40, urgency: 35, resource: 25 },
    crisis: { impact: 20, urgency: 60, resource: 20 },
    strategic: { impact: 60, urgency: 20, resource: 20 },
    balanced: { impact: 33, urgency: 33, resource: 34 }
  };

  const applyScenario = (scenario: string) => {
    const weights = scenarios[scenario as keyof typeof scenarios];
    setImpactWeight(weights.impact);
    setUrgencyWeight(weights.urgency);
    setResourceWeight(weights.resource);
    setSelectedScenario(scenario);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Priority Simulation Engine - {selectedPlant}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-slate-50">
                <CardHeader>
                  <CardTitle className="text-lg">Weighting Parameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Business Impact ({impactWeight}%)
                    </label>
                    <Slider
                      value={[impactWeight]}
                      onValueChange={(value) => setImpactWeight(value[0])}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Urgency ({urgencyWeight}%)
                    </label>
                    <Slider
                      value={[urgencyWeight]}
                      onValueChange={(value) => setUrgencyWeight(value[0])}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Resource Availability ({resourceWeight}%)
                    </label>
                    <Slider
                      value={[resourceWeight]}
                      onValueChange={(value) => setResourceWeight(value[0])}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium text-slate-700 mb-3">Quick Scenarios</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant={selectedScenario === 'current' ? 'default' : 'outline'}
                        onClick={() => applyScenario('current')}
                      >
                        Current
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedScenario === 'crisis' ? 'default' : 'outline'}
                        onClick={() => applyScenario('crisis')}
                      >
                        Crisis
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedScenario === 'strategic' ? 'default' : 'outline'}
                        onClick={() => applyScenario('strategic')}
                      >
                        Strategic
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedScenario === 'balanced' ? 'default' : 'outline'}
                        onClick={() => applyScenario('balanced')}
                      >
                        Balanced
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-slate-800">Simulation Impact</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Adjusting weights will reorder priorities in real-time
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="bg-slate-50">
                <CardHeader>
                  <CardTitle className="text-lg">Prioritized Part Changes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sortedParts.map((part, index) => {
                      const priority = getPriorityLevel(part.priorityScore);
                      return (
                        <Card key={part.id} className="bg-white hover:shadow-md transition-all duration-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {index + 1}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-slate-800">{part.partName}</h3>
                                  <p className="text-sm text-slate-600">{part.id}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className={priority.color}>{priority.level}</Badge>
                                <p className="text-sm font-medium text-slate-700 mt-1">
                                  Score: {part.priorityScore.toFixed(1)}
                                </p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 mb-3">
                              <div className="text-center">
                                <p className="text-xs text-slate-600">Impact</p>
                                <p className="font-semibold text-slate-800">{part.impact}/10</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-slate-600">Urgency</p>
                                <p className="font-semibold text-slate-800">{part.urgency}/10</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-slate-600">Resources</p>
                                <p className="font-semibold text-slate-800">{part.resourceAvailability}/10</p>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center text-sm text-slate-600">
                              <span>Value: ${part.businessValue.toLocaleString()}</span>
                              <span>Risk: {part.riskFactor}</span>
                              <span>Customer: {part.customerImpact}</span>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrioritySimulator;
