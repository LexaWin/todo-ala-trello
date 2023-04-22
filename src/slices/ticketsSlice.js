import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ticketsAPI } from '../backendMock/API';


export const selectCurrentTicket = state => state.tickets.currentTicket;
export const selectTodos = state => state.tickets.todos;
export const selectWips = state => state.tickets.wips;
export const selectDone = state => state.tickets.done;

const defaultTicket = {
    title: '',
    tags: [],
    description: '',
    comments: [],
    id: undefined,
}

const initialState = {
    tickets: [],
    todos: [],
    wips: [],
    done: [],
    loading: false,
    error: '',
    currentTicket: defaultTicket,
}

export const getTickets = createAsyncThunk(
    'tickets/get',
    () => ticketsAPI.requestAllTickets()
);

export const getTicketById = createAsyncThunk(
    'tickets/getById',
    (id) => ticketsAPI.requestTicketById(id)
);

export const updateTicket = createAsyncThunk(
    'tickets/update',
    async (data, thunkAPI) => {
        let nextState = [...thunkAPI.getState().tickets.tickets.filter(
            ticket => ticket.id.localeCompare(data.id) !== 0), data];
        await ticketsAPI.updateTickets(nextState);
        return nextState;
    }
);

export const getTicketsWithFilters = createAsyncThunk(
    'tickets/getFiltered',
    (filters) => ticketsAPI.requestTicketsWithFilters(filters)
);

export const createTicket = createAsyncThunk(
    'tickets/create',
    (ticket) => ticketsAPI.createTicket(ticket)
);

export const updateBackend = createAsyncThunk(
    'tickets/propogate',
    (data, thunkAPI)=> ticketsAPI.updateTickets(thunkAPI.getState().tickets.tickets)
)

export const deleteTicket = createAsyncThunk(
    'tickets/delete',
    (ticketId, thunkAPI) => ticketsAPI.updateTickets(
        thunkAPI.getState().tickets.tickets.filter(
            (ticket) => ticket.id.localeCompare(ticketId) !== 0
        )
    )
)

export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTickets: (state, action) => {
            state.tickets = action.payload;
            state.todos = state.tickets.filter((ticket) => ticket.status === 'todos');
            state.wips = state.tickets.filter((ticket) => ticket.status === 'wips');
            state.done = state.tickets.filter((ticket) => ticket.status === 'done');
        },
        updateColumns: (state, action) => {
            
            let data = action.payload.data;
            let col1, col2;
            if(Array.isArray(action.payload.columns)){
                col1 = action.payload.columns[0];
                col2 = action.payload.columns[1];
            }
            else {
                col1 = action.payload.columns;
                col2 = action.payload.columns;
            }
            state[col2].splice(data[1], 0, state[col1].splice(data[0], 1)[0]);
            let updTicket = state[col2][data[1]];
            console.log(updTicket)
            updTicket.status = col2;
            state.tickets = state.tickets.filter((ticket) => ticket.id.localeCompare(updTicket.id) !== 0);
            state.tickets.push(updTicket);
        },
        updateCurrentTicket: (state, action) => {
            state.currentTicket = state.tickets.filter(
                (ticket) => ticket.id.localeCompare(action.payload) === 0)[0];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTickets.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTickets.fulfilled, (state, action) => {
            state.loading = false;
            state.tickets = action.payload;
            state.todos = action.payload.filter((ticket) => ticket.status === 'todos');
            state.wips = action.payload.filter((ticket) => ticket.status === 'wips');
            state.done = action.payload.filter((ticket) => ticket.status === 'done');
        });
        builder.addCase(getTickets.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(updateTicket.fulfilled, (state, action) => {
            state.tickets = action.payload;
            state.todos = action.payload.filter((ticket) => ticket.status === 'todos');
            state.wips = action.payload.filter((ticket) => ticket.status === 'wips');
            state.done = action.payload.filter((ticket) => ticket.status === 'done');
        });
        builder.addCase(getTicketsWithFilters.fulfilled, (state, action) => {
            state.tickets = action.payload;
            state.todos = action.payload.filter((ticket) => ticket.status === 'todos');
            state.wips = action.payload.filter((ticket) => ticket.status === 'wips');
            state.done = action.payload.filter((ticket) => ticket.status === 'done');
        });
        builder.addCase(createTicket.fulfilled, (state, action) => {
            console.log(state, action);
            let data = [];
            if (!Array.isArray())
                data.push(action.payload);
            else
                data = action.payload;
            console.log(data);
            data = data.flat(2);
            state.tickets = data;
            state.todos = data.filter((ticket) => ticket.status === 'todos');
            state.wips = data.filter((ticket) => ticket.status === 'wips');
            console.log(data);
            state.done = data.filter((ticket) => ticket.status === 'done');
        });
        builder.addCase(getTicketById.fulfilled, (state, action) => {
            let res = action.payload;
            state.currentTicket = res ? res : defaultTicket;
        });
        builder.addCase(deleteTicket.fulfilled, (state, action) => {
            state.tickets = action.payload;
        });
    }
})

// Action creators are generated for each case reducer function
export const { setTickets, updateColumns, updateCurrentTicket } = ticketsSlice.actions

export default ticketsSlice.reducer