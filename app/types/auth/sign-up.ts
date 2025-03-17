export enum SUContentStep {
    RegStep = 0,
    FinalStep = 1,
}
  
export enum SULastContentStep {
    Extra = 6,
}
  
export enum SUContContentStep {
    Extra = 7,
}

export interface SignUpConfig {
    contentStep: SUContentStep;
    lastContentStep: SULastContentStep;
    contContentStep: SUContContentStep;
}

export interface SelectItem {
    title: string
    items: string[]
}

export interface InputItem {
    title: string
    prePlaceholder?: string
    placeholder: string
}

export interface Content {
    [key: number]: {
        text: {
        desc: string
        title: string
        preDesc?: string
        }
        search?: any
    }
}

export interface SelVariable {
    id: number,
    label: string,
    value: boolean
}

export interface NewSelectionItem {
    id: number,
    title: string,
    isShow: boolean,
    items: SelVariable[]
}

export interface ProfileType {
    id: number
    name: string
    slug: string
    is_active: boolean
}

export interface ProfileLegalForm {
    id: number
    name: string
    full_name: string
    description: string
    slug: string
}

export interface WorkFieldParent {
    id: number
    name: string
    slug: string
}

export interface WorkFieldBlock {
    id: number
    name: string
    slug: string
    children: FieldBlockChilde[]
}

export interface FieldBlockChilde {
    id: number
    name: string
    slug: string
    children: BlockChildeItem[]
}

export interface BlockChildeItem {
    id: number
    name: string
    slug: string
}
