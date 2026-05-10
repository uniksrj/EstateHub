// components/DeadDealTable.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';

const deadDeals = [
  {
    id: 'DD-2023-045',
    property: '123 Main St, Chicago, IL',
    type: 'Commercial',
    value: '$2.4M',
    reason: 'Financing',
    date: '2023-11-15',
    status: 'Lost',
  },
  {
    id: 'DD-2023-044',
    property: '456 Oak Ave, New York, NY',
    type: 'Residential',
    value: '$1.8M',
    reason: 'Price',
    date: '2023-11-12',
    status: 'Recovered',
  },
  {
    id: 'DD-2023-043',
    property: '789 Pine Rd, Los Angeles, CA',
    type: 'Industrial',
    value: '$4.2M',
    reason: 'Timing',
    date: '2023-11-08',
    status: 'Lost',
  },
  {
    id: 'DD-2023-042',
    property: '321 Elm Blvd, Miami, FL',
    type: 'Commercial',
    value: '$3.1M',
    reason: 'Condition',
    date: '2023-11-05',
    status: 'Lost',
  },
  {
    id: 'DD-2023-041',
    property: '654 Maple Ln, Seattle, WA',
    type: 'Residential',
    value: '$1.5M',
    reason: 'Competition',
    date: '2023-11-01',
    status: 'Recovered',
  },
];

const DeadDealTable = () => {
  const getStatusVariant = (status) => {
    return status === 'Recovered' ? 'default' : 'destructive';
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Deal ID</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deadDeals.map((deal) => (
          <TableRow key={deal.id}>
            <TableCell className="font-medium">{deal.id}</TableCell>
            <TableCell>{deal.property}</TableCell>
            <TableCell>{deal.type}</TableCell>
            <TableCell>{deal.value}</TableCell>
            <TableCell>{deal.reason}</TableCell>
            <TableCell>{deal.date}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(deal.status)}>
                {deal.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DeadDealTable;