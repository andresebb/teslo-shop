import React from 'react'

import { AttachMoneyOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { SummaryTile } from '../../components/admin';
import { AdminLayout } from '../../components/layouts';

const DashBoardPage = () => {
  return (
    <AdminLayout
      title='Dashboard'
      subTitle='General Statistics'
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>

        <SummaryTile
          title={10}
          subTitle="Total Orders"
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={10}
          subTitle="Paid Orders"
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={10}
          subTitle="Pending Orders"
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={10}
          subTitle="Clients"
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={10}
          subTitle="Products"
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={10}
          subTitle="No Inventory"
          icon={<CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={10}
          subTitle="Low Inventory"
          icon={<ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={10}
          subTitle="Refresh:"
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />

      </Grid>

    </AdminLayout>
  )
}

export default DashBoardPage