export {default} from 'next-auth/middleware'

export const config = {
    matcher: [
        '/Tasks/new',
        '/Tasks/edit/:id+'
    ]
}