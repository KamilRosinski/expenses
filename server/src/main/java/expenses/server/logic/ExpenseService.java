package expenses.server.logic;

import expenses.server.rest.dto.ExpenseDTO;
import expenses.server.rest.dto.MonthOverviewDTO;

import java.time.YearMonth;
import java.util.List;

public interface ExpenseService {

	List<MonthOverviewDTO> getMonths();
	List<ExpenseDTO> getExpensesByMonth(YearMonth yearMonth);
	void deleteExpenseById(Long expenseId);

}
