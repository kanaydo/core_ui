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
  sections?: string[],
  description?: string
}

export interface CustomerEntity {
  id:string;
	createdAt?:string;
	updatedAt?: string;
	firstName: string;
	lastName: string;
	email: string;
  phone?: string;
  address?: string;
}