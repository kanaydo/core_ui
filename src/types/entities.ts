export interface AdministratorEntity {
  id: string;
  username: string;
  createdAt: string;
  roleList: string[];
}

export interface RoleEntity {
  id: string;
	name: string;
	createdAt: string
	status: string
  sectionList?: string[],
  description?: string
}