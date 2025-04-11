document.addEventListener('DOMContentLoaded', function() {
    // Populate Invoicing Status
    const invoicingTableBody = document.getElementById('invoicing-table-body');
    if (projectData && projectData.invoicing && projectData.invoicing.milestones) {
        projectData.invoicing.milestones.forEach(milestone => {
            const row = invoicingTableBody.insertRow();
            row.insertCell().textContent = milestone.milestone;
            row.insertCell().textContent = milestone.plannedInvoiceDate || '-';
            row.insertCell().textContent = milestone.actualInvoiceDate || '-';
            row.insertCell().textContent = milestone.plannedPaymentDate || '-';
            row.insertCell().textContent = milestone.actualPaymentDate || '-';
            row.insertCell().textContent = `$${milestone.invoiceAmount.toLocaleString()}`;
            const paymentStatusCell = row.insertCell();
            paymentStatusCell.textContent = milestone.paymentStatus.toUpperCase();
            paymentStatusCell.className = `payment-status-${milestone.paymentStatus.toLowerCase()}`;
        });
    }

    // Populate Profitability Summary
    const profitabilityData = projectData && projectData.profitability;
    if (profitabilityData) {
        document.getElementById('profit-contract-value').textContent = `$${profitabilityData.contractValue.toLocaleString()}`;
        document.getElementById('profit-estimated-cost').textContent = `$${profitabilityData.estimatedCost.toLocaleString()}`;
        document.getElementById('profit-revenue-recognized').textContent = `$${profitabilityData.revenueRecognized.toLocaleString()}`;
        document.getElementById('profit-cost-incurred').textContent = `$${profitabilityData.costIncurred.toLocaleString()}`;

        const actualProfit = profitabilityData.revenueRecognized - profitabilityData.costIncurred;
        const plannedProfit = profitabilityData.revenueRecognized - (profitabilityData.estimatedCost * (profitabilityData.revenueRecognized / profitabilityData.contractValue)); // Assuming linear profit recognition

        document.getElementById('profit-actual').textContent = `$${actualProfit.toLocaleString()}`;
        document.getElementById('profit-planned').textContent = `$${plannedProfit.toLocaleString()}`;

        const actualMargin = (profitabilityData.revenueRecognized > 0) ? ((actualProfit / profitabilityData.revenueRecognized) * 100).toFixed(1) + '%' : '0%';
        const plannedMargin = (profitabilityData.revenueRecognized > 0) ? ((plannedProfit / profitabilityData.revenueRecognized) * 100).toFixed(1) + '%' : '0%';

        document.getElementById('profit-margin-actual').textContent = actualMargin;
        document.getElementById('profit-margin-planned').textContent = plannedMargin;
        document.getElementById('profit-utilization').textContent = profitabilityData.utilization;
        document.getElementById('profit-invoiced').textContent = `$${profitabilityData.invoicedToDate.toLocaleString()}`;
        document.getElementById('profit-payments-received').textContent = `$${profitabilityData.paymentsReceived.toLocaleString()}`;
        document.getElementById('profit-receivables').textContent = `$${(profitabilityData.invoicedToDate - profitabilityData.paymentsReceived).toLocaleString()}`;
    }

    // Populate Project Schedule
    const scheduleTableBody = document.getElementById('schedule-table-body');
    if (projectData && projectData.schedule && projectData.schedule.tasks) {
        projectData.schedule.tasks.forEach(task => {
            const row = scheduleTableBody.insertRow();
            row.insertCell().textContent = task.task;
            row.insertCell().textContent = task.status;
            row.insertCell().textContent = task.plannedStart || '-';
            row.insertCell().textContent = task.plannedEnd || '-';
            row.insertCell().textContent = task.actualStart || '-';
            row.insertCell().textContent = task.actualEnd || '-';
            row.insertCell().textContent = task.completion || '-';
            row.insertCell().textContent = task.resources || '-';
            row.insertCell().textContent = task.notes || '-';
        });
    }

    // Populate RAID Log
    const raidTableBody = document.getElementById('raid-table-body');
    if (projectData && projectData.raidLog) {
        projectData.raidLog.forEach(item => {
            const row = raidTableBody.insertRow();
            row.insertCell().textContent = item.id || '-';
            row.insertCell().textContent = item.type || '-';
            row.insertCell().textContent = item.title || '-';
            row.insertCell().textContent = item.description || '-';
            row.insertCell().textContent = item.impact || '-';
            row.insertCell().textContent = item.likelihood || '-';
            row.insertCell().textContent = item.status || '-';
            row.insertCell().textContent = item.owner || '-';
            row.insertCell().textContent = item.dateIdentified || '-';
            row.insertCell().textContent = item.mitigation || '-';
            row.insertCell().textContent = item.targetResolutionDate || '-';
            row.insertCell().textContent = item.lastUpdated || '-';
            row.insertCell().textContent = item.comments || '-';
        });
    }

    // Populate RAG Status
    const ragData = projectData && projectData.ragStatus;
    if (ragData) {
        document.getElementById('scope-rag').querySelector('.indicator').className = `indicator ${ragData.scope}`;
        document.getElementById('schedule-rag').querySelector('.indicator').className = `indicator ${ragData.schedule}`;
        document.getElementById('cost-rag').querySelector('.indicator').className = `indicator ${ragData.cost}`;
        document.getElementById('risk-rag').querySelector('.indicator').className = `indicator ${ragData.risk}`;
        document.getElementById('bug-rag').querySelector('.indicator').className = `indicator ${ragData.bug}`;
    }

    // Populate Bug Report
    const bugData = projectData && projectData.bug;
    if (bugData) {
        document.getElementById('open-bugs-chart').textContent = bugData.openBugs;
        document.getElementById('new-bugs-chart').textContent = bugData.newThisWeek;
        document.getElementById('resolved-bugs-chart').textContent = bugData.resolvedThisWeek;
        document.getElementById('critical-bugs-chart').textContent = bugData.criticalOpen;
        // Note: For actual charts, you would typically use a library like Chart.js here.
    }
});
