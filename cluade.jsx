import React, { useState, useCallback } from 'react';
import { ZoomableGroup, ComposableMap } from "react-simple-maps";
import { Motion, spring } from "react-motion";

const Node = ({ node, zoom, onNodeClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <g>
      <circle
        cx={node.x}
        cy={node.y}
        r={10 / zoom}
        fill={node.color || "#F53"}
        stroke={hovered ? "#000" : "none"}
        strokeWidth={1 / zoom}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onNodeClick(node)}
      />
      {zoom > 2 && (
        <text
          x={node.x}
          y={node.y + 20 / zoom}
          fontSize={12 / zoom}
          textAnchor="middle"
        >
          {node.name}
        </text>
      )}
    </g>
  );
};

const Flow = ({ flow, zoom, onNodeClick }) => {
  return (
    <g>
      {flow.connections.map((conn, index) => (
        <line
          key={index}
          x1={conn.source.x}
          y1={conn.source.y}
          x2={conn.target.x}
          y2={conn.target.y}
          stroke="#999"
          strokeWidth={1 / zoom}
        />
      ))}
      {flow.nodes.map((node, index) => (
        <Node key={index} node={node} zoom={zoom} onNodeClick={onNodeClick} />
      ))}
    </g>
  );
};

const ZoomableTraceMap = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [activeFlow, setActiveFlow] = useState(null);

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
    if (position.zoom <= 2) setActiveFlow(null);
  }

  const handleMoveEnd = (position) => {
    setPosition(position);
  }

  const handleNodeClick = useCallback((node) => {
    if (node.flow) {
      setActiveFlow(node.flow);
      setPosition(pos => ({
        coordinates: [node.x, node.y],
        zoom: 4
      }));
    }
  }, []);

  const mainFlow = {
    nodes: [
      { x: 0, y: 0, name: "API Gateway", color: "#F53", flow: {
        nodes: [
          { x: -50, y: -50, name: "Auth", color: "#3AF" },
          { x: 50, y: -50, name: "Routing", color: "#3AF" },
          { x: 0, y: 50, name: "Caching", color: "#3AF" }
        ],
        connections: [
          { source: { x: -50, y: -50 }, target: { x: 50, y: -50 } },
          { source: { x: 50, y: -50 }, target: { x: 0, y: 50 } },
          { source: { x: 0, y: 50 }, target: { x: -50, y: -50 } }
        ]
      }},
      { x: -100, y: 100, name: "User Service", color: "#FA3" },
      { x: 100, y: 100, name: "Product Service", color: "#3AF" },
      { x: 0, y: 200, name: "Database", color: "#3FA" }
    ],
    connections: [
      { source: { x: 0, y: 0 }, target: { x: -100, y: 100 } },
      { source: { x: 0, y: 0 }, target: { x: 100, y: 100 } },
      { source: { x: -100, y: 100 }, target: { x: 0, y: 200 } },
      { source: { x: 100, y: 100 }, target: { x: 0, y: 200 } }
    ]
  };

  return (
    <div className="trace-map">
      <div className="controls">
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>

      <Motion
        defaultStyle={{
          zoom: 1,
          x: 0,
          y: 0
        }}
        style={{
          zoom: spring(position.zoom, { stiffness: 210, damping: 20 }),
          x: spring(position.coordinates[0], { stiffness: 210, damping: 20 }),
          y: spring(position.coordinates[1], { stiffness: 210, damping: 20 })
        }}
      >
        {({ zoom, x, y }) => (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 100,
            }}
          >
            <ZoomableGroup
              zoom={zoom}
              center={[x, y]}
              onMoveEnd={handleMoveEnd}
            >
              <Flow
                flow={activeFlow || mainFlow}
                zoom={zoom}
                onNodeClick={handleNodeClick}
              />
            </ZoomableGroup>
          </ComposableMap>
        )}
      </Motion>
    </div>
  );
};

export default ZoomableTraceMap;