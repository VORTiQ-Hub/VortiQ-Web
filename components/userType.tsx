import React from 'react';
import { Badge } from '@/components/ui/badge';

export default function UserType({type}: {type: string}) {
    return (
        <Badge variant="none" className={` ${type ==="admin" ? "bg-red-900 text-white rounded-full" : "bg-yellow-600 text-white rounded-full"}`}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>
    )
}