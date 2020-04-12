package expenses.server.logic.impl;

import expenses.server.logic.ExpenseService;
import expenses.server.persistence.repository.ExpenseRepository;
import expenses.server.rest.dto.MonthOverviewDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

	private final ExpenseRepository expenseRepository;

	@Override
	public List<MonthOverviewDTO> getMonths() {
		return this.expenseRepository.getIncomeAndOutcomeGroupedByMonth().stream()
				.map(map -> new MonthOverviewDTO(
						YearMonth.of(((Integer) map.get("year")).intValue(), ((Integer) map.get("month")).intValue()),
						(Long) map.get("income"),
						(Long) map.get("outcome")
				))
				.collect(Collectors.toList());
	}

}
