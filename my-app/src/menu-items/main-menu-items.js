import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
    IconAtom,
    IconBasket,
    IconBellRinging,
    IconBorderAll,
    IconBorderRadius,
    IconBoxMultiple,
    IconBrandChrome,
    IconBrandGravatar,
    IconBrush,
    IconBug,
    IconCalendar,
    IconChartArcs,
    IconChartCandle,
    IconChartInfographic,
    IconCircle,
    IconCircleOff,
    IconClipboardList,
    IconDashboard,
    IconDeviceAnalytics,
    IconFiles,
    IconForms,
    IconHelp,
    IconId,
    IconKey,
    IconLayoutList,
    IconLoader,
    IconLockAccess,
    IconMail,
    IconMenu,
    IconMessages,
    IconNfc,
    IconPalette,
    IconPencil,
    IconPhoneCall,
    IconPictureInPicture,
    IconReceipt2,
    IconRun,
    IconShadow,
    IconShape,
    IconShieldLock,
    IconSitemap,
    IconTools,
    IconTypography,
    IconUser,
    IconUserCheck,
    IconShoe,
    IconCategory2,
    IconRulerMeasure
} from '@tabler/icons';

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,

    IconChartArcs: IconChartArcs,
    IconClipboardList: IconClipboardList,
    IconChartInfographic: IconChartInfographic,

    IconForms: IconForms,
    IconReceipt2: IconReceipt2,
    IconPencil: IconPencil,
    IconPalette: IconPalette,
    IconShadow: IconShadow,
    IconPhoneCall: IconPhoneCall,
    IconBrandChrome: IconBrandChrome,
    IconFiles: IconFiles,
    IconAtom: IconAtom,
    IconTools: IconTools,
    IconBrush: IconBrush,
    IconLockAccess: IconLockAccess,
    IconShieldLock: IconShieldLock,
    IconKey: IconKey,
    IconTypography: IconTypography,
    IconMenu: IconMenu,
    IconBoxMultiple: IconBoxMultiple,
    IconCircleOff: IconCircleOff,
    IconCircle: IconCircle,
    IconBorderRadius: IconBorderRadius,
    IconBrandGravatar: IconBrandGravatar,
    IconShape: IconShape,
    IconUserCheck: IconUserCheck,
    IconId: IconId,
    IconLayoutList: IconLayoutList,
    IconBug: IconBug,
    IconLoader: IconLoader,
    IconRun: IconRun,
    IconUser: IconUser,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap,
    IconPictureInPicture: IconPictureInPicture,
    IconMail: IconMail,
    IconMessages: IconMessages,
    IconNfc: IconNfc,
    IconCalendar: IconCalendar,
    IconBellRinging: IconBellRinging,
    IconBorderAll: IconBorderAll,
    IconChartCandle: IconChartCandle,
    IconBasket: IconBasket,
    IconShoe: IconShoe,
    IconCategory2: IconCategory2,
    IconRulerMeasure: IconRulerMeasure
};

const menuItems = {
    items: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'group',
            children: [
                {
                    id: 'dash-default',
                    title: <FormattedMessage id="default" />,
                    type: 'item',
                    url: '/dashboard/default',
                    icon: icons['IconDashboard'],
                    breadcrumbs: false
                }
            ]
        },

        {
            id: 'pages',
            title: <FormattedMessage id="pages" />,
            caption: <FormattedMessage id="pages-caption" />,
            type: 'group',
            children: [
                {
                    id: 'authentication',
                    title: <FormattedMessage id="authentication" />,
                    type: 'collapse',
                    icon: icons['IconKey'],
                    children: [




                        {
                            id: 'login3',
                            title: <FormattedMessage id="login" />,
                            type: 'item',
                            url: '/pages/login/login3',
                            target: true
                        },
                        {
                            id: 'register3',
                            title: <FormattedMessage id="register" />,
                            type: 'item',
                            url: '/pages/register/register3',
                            target: true
                        }






                    ]
                },
                {
                    id: 'manage-product',
                    title: <FormattedMessage id="Product" />,
                    type: 'item',
                    url: '/admin/product',
                    icon: icons['IconShoe'],
                    breadcrumbs: false
                },
                {
                    id: 'manage-category',
                    title: <FormattedMessage id="Category" />,
                    type: 'item',
                    url: '/admin/category',
                    icon: icons['IconCategory2'],
                    breadcrumbs: false
                },
                {
                    id: 'manage-size',
                    title: <FormattedMessage id="Size" />,
                    type: 'item',
                    url: '/admin/sizeOrColor/size',
                    icon: icons['IconRulerMeasure'],
                    breadcrumbs: false
                },
                {
                    id: 'manage-color',
                    title: <FormattedMessage id="Color" />,
                    type: 'item',
                    url: '/admin/sizeOrColor/color',
                    icon: icons['IconPalette'],
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'utilities',
            title: <FormattedMessage id="utilities" />,
            type: 'group',
            children: [
                {
                    id: 'util-typography',
                    title: <FormattedMessage id="typography" />,
                    type: 'item',
                    url: '/utils/util-typography',
                    icon: icons['IconTypography']
                },
                {
                    id: 'color',
                    title: <FormattedMessage id="color" />,
                    type: 'item',
                    url: '/utils/util-color',
                    icon: icons['IconPalette']
                },
                {
                    id: 'shadow',
                    title: <FormattedMessage id="shadow" />,
                    type: 'item',
                    url: '/utils/util-shadow',
                    icon: icons['IconShadow']
                },
                {
                    id: 'icons',
                    title: <FormattedMessage id="icons" />,
                    type: 'collapse',
                    icon: icons['IconPencil'],
                    children: [
                        {
                            id: 'util-tabler-icons',
                            title: <FormattedMessage id="tabler-icons" />,
                            type: 'item',
                            url: '/icons/tabler-icons'
                        },
                        {
                            id: 'util-material-icons',
                            title: <FormattedMessage id="material-icons" />,
                            type: 'item',
                            url: '/icons/material-icons'
                        }
                    ]
                }
            ]
        },
        {
            id: 'sample-docs-roadmap',
            type: 'group',
            children: [
                {
                    id: 'sample-page',
                    title: <FormattedMessage id="sample-page" />,
                    type: 'item',
                    url: '/sample-page',
                    icon: icons['IconBrandChrome']
                },
                {
                    id: 'documentation',
                    title: <FormattedMessage id="documentation" />,
                    type: 'item',
                    url: '#',
                    icon: icons['IconHelp'],
                    target: true,
                    external: true
                }
            ]
        }
    ]
};

export default menuItems;
