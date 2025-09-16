import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    findAll(): Promise<string>;
    findOne(id: string): Promise<string>;
    create(dto: ContactDto): Promise<string>;
    update(id: string, dto: ContactDto): Promise<string>;
    remove(id: string): Promise<string>;
}
