export interface AdministratorEntity {
  id: number;
  username: string;
  createdAt: string;
  roleList: string[];
}

export interface RoleEntity {
  id: number;
	name: string;
	createdAt: string
	status: string
  sections?: string[],
  description?: string
}