package expenses.server.logic.impl;

import expenses.server.logic.ExpenseService;
import expenses.server.persistence.entity.ExpenseEntity;
import expenses.server.persistence.repository.ExpenseRepository;
import expenses.server.rest.dto.ExpenseDTO;
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
				.map(params -> {
					final Integer year = (Integer) params.get("year");
					final Integer month = (Integer) params.get("month");
					final Long income = (Long) params.get("income");
					final Long outcome = (Long) params.get("outcome");
					return new MonthOverviewDTO(YearMonth.of(year.intValue(), month.intValue()), income, outcome);
				})
				.collect(Collectors.toList());
	}

	@Override
	public List<ExpenseDTO> getExpensesByMonth(final YearMonth yearMonth) {
		return expenseRepository.getExpensesByMonth(yearMonth.getYear(), yearMonth.getMonthValue()).stream()
				.map(ExpenseEntity::map2dto)
				.collect(Collectors.toList());
	}

	@Override
	public void deleteExpenseById(final Long expenseId) {
		expenseRepository.deleteById(expenseId);
	}

}
