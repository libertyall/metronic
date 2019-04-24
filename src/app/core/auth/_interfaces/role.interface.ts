import { BaseModel } from '../../_base/crud';

export interface Role extends BaseModel {
    id: string;
    title: string;
    permissions: string[];
    isCoreRole: boolean;
}

