// specific pathfinding algo that I decided to use. It's neat.
export default function dijkstra(startId, goalId, nodes) {
    // Initialize distances and priority queue
    let distances = {};
    let previousNodes = {};
    let pq = new PriorityQueue();

    // Set all distances to infinity except for the start node
    nodes.forEach(node => {
        distances[node.id] = Infinity;
        previousNodes[node.id] = null;
    });
    distances[startId] = 0;
    pq.enqueue(startId, 0);

    while (!pq.isEmpty()) {
        let currentNodeId = pq.dequeue().element;
        let currentNode = nodes.find(node => node.id === currentNodeId);

        if (currentNodeId === goalId) {
            // Reached goal, reconstruct the path
            let path = [];
            let current = goalId;
            while (current) {
                path.unshift(current);
                current = previousNodes[current];
            }
            return path;
        }

        // Explore neighbors
        for (let connection of currentNode.connected_to) {
            let neighborNode = nodes.find(node => node.id === connection.id);
            let weight = connectionWeight(connection.type);
            let newDistance = distances[currentNodeId] + (weight * euclideanDistance(currentNode, neighborNode));

            if (newDistance < distances[neighborNode.id]) {
                distances[neighborNode.id] = newDistance;
                previousNodes[neighborNode.id] = currentNodeId;
                pq.enqueue(neighborNode.id, newDistance);
            }
        }
    }

    return null; // No path found
}

// needed for dijkstra
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    // Method to enqueue an element with its priority
    enqueue(element, priority) {
        let item = { element, priority };

        // Insert the element in the correct position based on its priority
        let added = false;
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].priority > priority) {
                this.queue.splice(i, 0, item);
                added = true;
                break;
            }
        }

        if (!added) {
            this.queue.push(item); // If no position was found, add it at the end
        }
    }

    // Method to dequeue the element with the highest priority (lowest value)
    dequeue() {
        return this.queue.shift(); // Remove the first element in the queue (lowest priority)
    }

    // Method to check if the queue is empty
    isEmpty() {
        return this.queue.length === 0;
    }
}

// add other modes of transport later
function connectionWeight(type) {
    if (type === "plane") return 0.1; 
    if (type === "train") return 1;   
    return 1; 
}

// distance between two nodes
function euclideanDistance(nodeA, nodeB) {
    let dx = nodeA.posX - nodeB.posX;
    let dy = nodeA.posY - nodeB.posY;
    return Math.sqrt(dx * dx + dy * dy);
}