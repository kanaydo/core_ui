import { Type } from "class-transformer";

export class CustomerEntity {
  id:string;
	createdAt?:string;
	updatedAt?: string;
	firstName: string;
	lastName: string;
	email: string;
  phone?: string;
  address?: string;
  @Type(() => CustomerAdministratorEntity)
  administrator?: CustomerAdministratorEntity

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    createdAt?:string,
    updatedAt?: string,
    phone?: string,
    address?: string,
    administrator?: CustomerAdministratorEntity
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.administrator = administrator;
  }
}

export class CustomerAdministratorEntity {
  id: string;
  username: string;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }

  toString() {
    return this.username;
  }
}