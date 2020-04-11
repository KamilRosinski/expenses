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
		return expenseRepository.selectMonths().stream()
				.map(obj -> {
					final Integer year = (Integer) obj[0];
					final Integer month = (Integer) obj[1];
					final Long balance = (Long) obj[2];
					return new MonthOverviewDTO(YearMonth.of(year.intValue(), month.intValue()), balance);
				})
				.collect(Collectors.toList());
	}

}
