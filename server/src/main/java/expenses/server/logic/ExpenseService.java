package expenses.server.logic;

import expenses.server.rest.dto.SubCategoryDTO;
import expenses.server.rest.dto.MonthDTO;
import expenses.server.rest.dto.MonthOverviewDTO;
import expenses.server.rest.dto.TransactionCreateDTO;
import expenses.server.rest.dto.TransactionDTO;

import java.time.YearMonth;
import java.util.List;

public interface ExpenseService {

	List<MonthOverviewDTO> getMonthOverviews();

	MonthDTO getMonthById(Long id);

	MonthDTO createMonth(YearMonth yearMonth);

	TransactionDTO createTransaction(TransactionCreateDTO transactionCreate);

	List<SubCategoryDTO> getCategories();

}
