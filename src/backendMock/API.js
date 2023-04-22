import { LSRequest } from "./LSRequest";
import { v4 as uuidv4 } from 'uuid';
const lsRequest = new LSRequest();
const TICKETS_KEY = 'MY_TICKETS';

export class TicketsAPI {
    async createTicket({title, description, tags, status, comments = []}) {
        let tickets = await this.requestAllTickets();
        console.log('tickets', tickets, '...tickets', ...tickets);
        tickets = [
            ...tickets,
            { id: uuidv4(), title, description, tags, status, comments },
        ];
        await this.updateTickets(tickets);
        return tickets;
    }

    async requestTicketsWithFilters({hasTags, hasComments, hasDescription}) {
        let tickets = await this.requestAllTickets();
        if (tickets[0].message === 'nothing')
            return [];
        console.log(hasComments);

        return tickets.filter((ticket) => (
            (!hasTags || (ticket.tags.length > 0)) &&
            (!hasComments || (ticket.comments.length > 0)) &&
            (!hasDescription || (ticket.description !== undefined))
        ));
    }

    requestAllTickets() {
        return lsRequest.getItem(TICKETS_KEY);
    }

    requestTicketById(id) {
        return lsRequest.getItemById(TICKETS_KEY, id);
    }


    updateTickets(items) {
        return lsRequest.setItem(TICKETS_KEY, items);
    }
}
export const ticketsAPI = new TicketsAPI();