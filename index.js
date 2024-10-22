// Each object / dictionary in the list, represents a connection from one airport to the next and has 3 properties: start, end and cost.

// The airports may or may not have a direct connection. For example, you can get to LHR from ISB directly by following the path on index 0 of the example list. However, if you want to get from ISB to NYC, you have to take the path from ISB to LHR and then LHR to NYC or ISB to CBS and then CBS to NYC.

const airports = [
    {
        start: 'ISB',
        end: 'LHR',
        cost: 1000
    },
    {
        start: 'LHR',
        end: 'NYC',
        cost: 750
    },
    {
        start: 'CBS',
        end: 'NYC',
        cost: 775
    },
    {
        start: 'ISB',
        end: 'CBS',
        cost: 575
    },
    {
        start: 'CBS',
        end: 'GRC',
        cost: 731
    },
    {
        start: 'NYC',
        end: 'GRC',
        cost: 459
    }
]

// ISB - NYC

const findShortestPath = (start_point, end_point) => {
    const path = {};
    airports.forEach(({ start, end, cost }) => {
        if (!path[start]) path[start] = [];
        path[start].push({ end, cost });
    });
    const costs = {};
    const parents = {};
    const visited = new Set();

    
    for (const airport in path) {
        costs[airport] = Infinity;
    }
    costs[start_point] = 0;

    let currentAirport = start_point;

    while (currentAirport) {
        const currentCost = costs[currentAirport];

        if (path[currentAirport]) {
            for (const { end, cost } of path[currentAirport]) {
                const newCost = currentCost + cost;
                if (newCost < costs[end]) {
                    costs[end] = newCost;
                    parents[end] = currentAirport;
                }
            }
        }

        visited.add(currentAirport);
        currentAirport = null;

        let lowestCost = Infinity;
        for (const airport in costs) {
            if (!visited.has(airport) && costs[airport] < lowestCost) {
                lowestCost = costs[airport];
                currentAirport = airport;
            }
        }
    }

    const route = [];
    let current = end_point;
    while (current) {
        route.unshift(current);
        current = parents[current];
    }

    return {
        cost: costs[end_point] === Infinity ? null : costs[end_point],
        route: route.length > 1 ? route : null
    };
};


console.log(findShortestPath('ISB', 'NYC'));