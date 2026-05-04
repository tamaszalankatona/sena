export interface ISignUpSteps {
  header: string;
  subHeader: string;
  component: React.LazyExoticComponent<React.FC<Record<string, string>>>;
}
