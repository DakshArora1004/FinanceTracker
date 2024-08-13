import { ResponsiveTreeMap } from '@nivo/treemap'
import { useEffect, useState } from 'react';   

function Categories({transactions}){
    const [categorizedSum, setCategorizedSum] = useState({});
    useEffect(() => {
        let newCategorizedSum = {};
        transactions.forEach((transaction) => {
            const amount = parseInt(transaction.amount, 10);
            if (newCategorizedSum[transaction.category]) {
                newCategorizedSum[transaction.category] += amount;
            } else {
                newCategorizedSum[transaction.category] = amount;
            }
        });
        setCategorizedSum(newCategorizedSum);
    }, [transactions]);

    const theme={
        "background": "#ffffff",
        "text": {
            "fontSize": 14,
            "fill": "#333333",
            "outlineWidth": 0,
            "outlineColor": "transparent",
            "fontFamily": "DM Sans"
        },
        "axis": {
            "domain": {
                "line": {
                    "stroke": "#777777",
                    "strokeWidth": 1
                }
            },
            "legend": {
                "text": {
                    "fontSize": 12,
                    "fill": "#333333",
                    "outlineWidth": 0,
                    "outlineColor": "transparent"
                }
            },
            "ticks": {
                "line": {
                    "stroke": "#777777",
                    "strokeWidth": 1
                },
                "text": {
                    "fontSize": 11,
                    "fill": "#333333",
                    "outlineWidth": 0,
                    "outlineColor": "transparent"
                }
            }
        },
        "grid": {
            "line": {
                "stroke": "#dddddd",
                "strokeWidth": 1
            }
        },
        "legends": {
            "title": {
                "text": {
                    "fontSize": 11,
                    "fill": "#333333",
                    "outlineWidth": 0,
                    "outlineColor": "transparent"
                }
            },
            "text": {
                "fontSize": 11,
                "fill": "#333333",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            },
            "ticks": {
                "line": {},
                "text": {
                    "fontSize": 10,
                    "fill": "#333333",
                    "outlineWidth": 0,
                    "outlineColor": "transparent"
                }
            }
        },
        "annotations": {
            "text": {
                "fontSize": 13,
                "fill": "#333333",
                "outlineWidth": 2,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
            },
            "link": {
                "stroke": "#000000",
                "strokeWidth": 1,
                "outlineWidth": 2,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
            },
            "outline": {
                "stroke": "#000000",
                "strokeWidth": 2,
                "outlineWidth": 2,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
            },
            "symbol": {
                "fill": "#000000",
                "outlineWidth": 2,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
            }
        },
        "tooltip": {
            "wrapper": {},
            "container": {
                "background": "#ffffff",
                "color": "#333333",
                "fontSize": 12
            },
            "basic": {},
            "chip": {},
            "table": {},
            "tableCell": {},
            "tableCellValue": {}
        }
    }

    const [data, setData] = useState({});

    useEffect(() => {
        const formattedData = {
            name: "Categories",
            color: "hsl(164, 70%, 50%)",
            children: Object.entries(categorizedSum).map(([category, value]) => ({
                name: category,
                color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                loc: value
            }))
        };
        
        setData(formattedData);
        
        // Log the formatted data
    }, [categorizedSum]);

    const MyResponsiveTreeMap = ({ data /* see data tab */ }) => (
        <ResponsiveTreeMap
            data={data}
            identity="name"
            value="loc"
            valueFormat=".02s"
            theme={theme}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            label={e=>e.id+" ("+e.formattedValue+")"}
            labelSkipSize={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        '2.6'
                    ]
                ]
            }}
            orientLabel={false}
            enableParentLabel={false}
            parentLabelSize={15}
            parentLabelPosition="left"
            parentLabelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            colors={{ scheme: 'tableau10' }}
            nodeOpacity={0.7}
            borderWidth={2}
            borderColor={{ theme: 'labels.text.fill' }}
        />
    )

    return(
        <div style={{ height: 500 }}>
            <MyResponsiveTreeMap data={data} />
        </div>
    )
}

export default Categories;