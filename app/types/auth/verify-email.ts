export enum EIconType {
    Info = 'info',
    Success = 'success',
    Error = 'error',
}

export interface ConfettiConfig {
    lifetime?: number
    angle?: number
    decay?: number
    spread?: number
    startVelocity?: number
    elementCount?: number
    elementSize?: number
    zIndex?: number
    position?: string
    colors?: string[]
    onAnimationComplete?: () => void
}