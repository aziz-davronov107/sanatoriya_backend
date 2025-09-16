import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactService {
  async findAll() {
    return 'ok';
  }
  async findOne(id: string) {
    return 'ok';
  }
  async create() {
    return 'ok';
  }
  async update() {
    return 'ok';
  }
  async remove() {
    return 'ok';
  }
}
