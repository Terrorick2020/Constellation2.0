export enum RPContentStep {
    EmailStep = 0,
    CodeStep = 1,
    RewritePassStep = 2,
    FinalStep = 3,
}
  
export enum RPLastContentStep {
    Extra = 3,
}

export enum RPContContentStep {
    Extra = 4,
}

export interface ResetPassConfig {
    contentStep: RPContentStep;
    lastContentStep: RPLastContentStep;
    contContentStep: RPContContentStep;
}