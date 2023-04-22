import React from "react";
import {Routes, Route }  from "react-router-dom";
import { AddCommentModal } from "./components/Modals/AddCommentModal";
import { ConfirmDeletionModal } from "./components/Modals/ConfirmDeletionModal";
import { CreateTaskModal } from "./components/Modals/CreateTaskModal";
import { EditTaskModal } from "./components/Modals/EditTaskModal";
import { MainPage } from "./pages/MainPage";
import { TicketPage } from "./pages/TicketPage";
export const AppRoutes = () => (
    <Routes>
        <Route path='' element={<MainPage />}>
            <Route path='create' element={<CreateTaskModal />}/>
            <Route path='create/:column' element={<CreateTaskModal />}/>
            <Route path='edit/:ticketId' element={<EditTaskModal />} /> 
        </Route>
        <Route path='full/:ticketId' element={<TicketPage />}>
            <Route path='comment/create' element={<AddCommentModal />} />
            <Route path='delete' element={<ConfirmDeletionModal/>}/>
        </Route>
    </Routes>
)