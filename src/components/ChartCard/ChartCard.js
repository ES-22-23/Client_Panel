import "./ChartCard.css"

import {AreaChart, Area, XAxis, Tooltip, ResponsiveContainer} from 'recharts';
import AccordionItem from "react-bootstrap/AccordionItem";
import {Accordion} from "react-bootstrap";

const ChartCard = (props) => {

    let accordionContent = (
        <AccordionItem eventKey={"0"}>
            <Accordion.Header>
                <div className="mx-3 my-2 fs-6 fw-light">
                    {props.title}
                </div>
            </Accordion.Header>
            <Accordion.Body className="mx-0 p-0">
                <div className="chart">
                    <h3 className="m-0">{props.title}</h3>
                    <small id="systemCleanupHelp" className="form-text text-muted">
                        {props.description}
                    </small>
                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={props.data}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>

                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82C3EC" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#82C3EC" stopOpacity={0}/>
                                </linearGradient>
                            </defs>

                            <XAxis
                                allowDataOverflow
                                dataKey="date"
                                tick={false}
                                axisLine={false}
                            />

                            <Tooltip />

                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                            <Area type="monotone" dataKey="intrusions" stroke="#82C3EC" fillOpacity={1} fill="url(#colorPv)" />

                        </AreaChart>
                    </ResponsiveContainer>

                </div>

            </Accordion.Body>
        </AccordionItem>
    );

    if (props.open) {
        return (
            <Accordion defaultActiveKey={"0"} className="mb-4">
                {accordionContent}
            </Accordion>
        );
    } else {
        return (
            <Accordion className="mb-4">
                {accordionContent}
            </Accordion>
        );
    }

};

export default ChartCard;
