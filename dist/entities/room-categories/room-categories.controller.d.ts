import { RoomCategoriesService } from './room-categories.service';
export declare class RoomCategoriesController {
    private readonly roomCategoriesService;
    constructor(roomCategoriesService: RoomCategoriesService);
    findAll(): Promise<{
        id: number;
        title: string;
    }[]>;
}
