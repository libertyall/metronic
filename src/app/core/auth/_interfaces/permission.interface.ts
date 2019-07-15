import { BaseModel } from '../../_base/crud';

export interface PermissionClass extends BaseModel {
    id: string;
    title: string;
    level: number;
    parentId: string;
    isSelected:  boolean;
    name: string;
    _children: PermissionClass[];
}
