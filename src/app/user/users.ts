import { AbstractEntity } from '../abstract-entity';
import { Pageable } from '../models/pageable';
import { Sort } from '../models/sort';

export interface Users extends AbstractEntity {

    name: string;
    telephoneNumbers: string;
    emailAddresses: string

}

export interface UsersPage {
    content?: Users[];
    pageable: Pageable;
    totalElements: number;
    last: boolean;
    totalPages: number;
    first: boolean;
    sort: Sort;
    numberOfElements: number;
    size: number;
    number: number;
    empty: boolean;
  
  }