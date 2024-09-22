import React from 'react';
import { Badge } from '@/components/ui/badge';

export default function Status({type}: {type: string}) {
    return (
        <Badge variant="none" className={` ${type ==="Inactive" ? "bg-red-600 text-white rounded-full" : "bg-green-600 text-white rounded-full"}`}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>
    )
}