const NODE_DATA = [
    {
        type: 'NODE',
        label: {
            contents: 'NODE 01',
            position: { x: 20, y: 20 },
            font: { size: 16, color: '#333333' },
        },
        size: { w:300, h:300 },
        position: { x:0, y:0 },
        children: [
            {
                type: 'NODE',
                label: {
                    contents: 'NODE 03',
                    position: { x: 20, y: 20 },
                    font: { size: 16, color: '#333333' },
                },
                size: { w:100, h:100 },
                position: { x:100, y:100 },
                children: [],
                id: 3,
                link: { url: 'https://twitter.com/home' },
            },
        ],
        id: 1,
    },
    {
        type: 'NODE',
        label: {
            contents: 'NODE 02',
            position: { x: 20, y: 20 },
            font: { size: 16, color: '#333333' },
        },
        size: { w:300, h:200 },
        position: { x:500, y:0 },
        children: [
            {
                type: 'COMPONENT',
                label: {
                    contents: 'COPM 01',
                    position: { x: 20, y: 20 },
                    font: { size: 16, color: '#333333' },
                },
                size: { w:200, h:100 },
                position: { x:50, y:50 },
                children: [],
                id: 4,
            },
        ],
        id: 2,
    }
];

export default NODE_DATA;
