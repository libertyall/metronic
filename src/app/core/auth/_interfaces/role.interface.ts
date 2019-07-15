import { BaseModel } from '../../_base/crud';

export interface RoleClass extends BaseModel {
    id: string;
    title: string;
    permissions: string[];
    isCoreRole: boolean;
}

