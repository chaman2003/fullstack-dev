import express from 'express'
import {  login, signup } from './controller.js'

const router=express();

router.get('/login',login)
router.get('/signup',signup)

export default router