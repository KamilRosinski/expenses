package expenses.server.logic.impl;

import expenses.server.logic.ExpenseService;
import expenses.server.rest.dto.MonthOverviewDTO;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.Arrays;
import java.util.List;

@Service
//@Transactional
public class ExpenseServiceImpl implements ExpenseService {

	@Override
	public List<MonthOverviewDTO> getMonths() {
		return Arrays.asList(
				new MonthOverviewDTO(YearMonth.of(2020, 1), Integer.valueOf(100000), Integer.valueOf(210000)),
				new MonthOverviewDTO(YearMonth.of(2020, 2), Integer.valueOf(120000), Integer.valueOf(90000))
		);
	}

}
