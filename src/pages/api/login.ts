import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from 'next'
import {useState} from 'react';

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

async function loginRoute (req: NextApiRequest, res: NextApiResponse){
        withIronSessionApiRoute (
            async function loginRoute(req, res){
                const {data} = useSWR(`/api/users?id=${userId}`, fetcher)
                console.log(data.id)
                req.session.user={id: data.id};
                await req.sesison.save();
                res.send({ok: true})
            },
            {
                cookieName: '',
                password: '',
                cookieOptions: {
                    secure: process.env.NODE_ENV === "production",
                }
            }
        )
    }

export default withIronSessionApiRoute(loginRoute, sessionOptions)
