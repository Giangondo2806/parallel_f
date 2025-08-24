export class DepartmentChartResponseDto {
  departmentData: {
    departmentName: string;
    totalResources: number;
    urgentResources: number;
    availableResources: number;
    utilizationRate: number;
  }[];
  chartConfig: {
    type: 'bar' | 'pie' | 'line';
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
    }>;
  };
  summary: {
    totalDepartments: number;
    highestUtilization: string;
    lowestUtilization: string;
  };
}
