import { AbstractEntity } from '../abstract-entity';

export interface Users extends AbstractEntity {

    name: string;
    telephoneNumbers: string;
    emailAddresses: string

}