import { BaseModel } from '../../_base/crud';

export interface Permission extends BaseModel {
    id: string;
    title: string;
    level: number;
    parentId: string;
    isSelected:  boolean;
    name: string;
    _children: Permission[];
}
