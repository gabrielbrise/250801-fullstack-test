export interface EmploymentResponse {
  selectedStates: string;
  yearQuarter: string;
  employment: EmploymentRow[];
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface EmploymentRow {
  state: string;
  male?: number;
  female?: number;
  total: number;
}
