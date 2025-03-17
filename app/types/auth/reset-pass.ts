export enum RPContentStep {
    CodeStep = 0,
    RewritePassStep = 1,
    FinalStep = 2,
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